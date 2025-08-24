import { useState } from 'react';

import EmptyState from '../ui/EmptyState';
import Header from '../ui/Header';

import LinkModal from './LinkModal';
import ModuleModal from './ModuleModal';
import UploadModal from './UploadModal';
import CourseNavigation from './CourseNavigation';

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableModule from "./SortableModule";

const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [items, setItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  // Modal states
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Current items for editing
  const [currentModule, setCurrentModule] = useState(null);
  const [currentModuleId, setCurrentModuleId] = useState(null);


  // drag events
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id != over.id) {
      const oldIndex = modules.findIndex(m => m.id === active.id);
      const newIndex = modules.findIndex(m => m.id === over.id);
      setModules(arrayMove(modules, oldIndex, newIndex));
    }
  }

  const handleAddClick = type => {
    switch (type) {
      case 'module':
        setCurrentModule(null);
        setIsModuleModalOpen(true);
        break;
      case 'link':
        setCurrentModule(null);
        setIsLinkModalOpen(true);
        break;
      case 'upload':
        setCurrentModule(null);
        setIsUploadModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleCloseModuleModal = () => {
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleCloseLinkModal = () => {
    setIsLinkModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleSaveModule = module => {
    if (currentModule) {
      // Edit existing module
      setModules(modules.map(m => (m.id === module.id ? module : m)));
    } else {
      // Add new module
      setModules([...modules, module]);
    }
    setIsModuleModalOpen(false);
    setCurrentModule(null);
  };

  const handleEditModule = module => {

    setCurrentModule(module);
    if (module.type === 'file') {
      setIsUploadModalOpen(true);
    } else if (module.type === 'link') {
      setIsLinkModalOpen(true);
    } else {
      setIsModuleModalOpen(true);
    }

  };

  const handleDeleteModule = moduleId => {
    setModules(modules.filter(module => module.id !== moduleId));
    // Also remove any items associated with this module
    setItems(items.filter(item => item.moduleId !== moduleId));
  };

  const handleAddItem = (moduleId, type) => {
    setCurrentModuleId(moduleId);
    if (type === 'link') {
      setIsLinkModalOpen(true);
    } else if (type === 'file') {
      setIsUploadModalOpen(true);
    }
  };

  const handleSaveLink = linkItem => {

    console.log(linkItem);
    console.log(currentModule);


    if (currentModule) {
      setModules(modules.map(m => (m.id === linkItem.id ? linkItem : m)));
      setIsLinkModalOpen(false);
      setCurrentModule(null);
      return;
    }

    if (linkItem.moduleId) {
      setItems([...items, linkItem]);
      setIsLinkModalOpen(false);
      setCurrentModuleId(null);
      return;
    }

    setModules([...modules, linkItem]);
    setIsLinkModalOpen(false);
    setCurrentModuleId(null);


  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };


  const handleSaveUpload = fileItem => {



    if (currentModule) {
      setModules(modules.map(m => (m.id === fileItem.id ? fileItem : m)));
      setIsUploadModalOpen(false);
      setCurrentModule(null);
      return;
    }

    if (fileItem.moduleId) {
      setItems([...items, fileItem]);
      setIsUploadModalOpen(false);
      setCurrentModuleId(null);
      return;
    }
    setModules([...modules, fileItem]);
    setIsUploadModalOpen(false);
    setCurrentModuleId(null);
  };

  const handleDeleteItem = itemId => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const filteredModules = modules
    .map(module => {
      const moduleItems = items.filter(item =>
        item.moduleId === module.id &&
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moduleItems.length > 0
      ) {
        return { ...module, moduleItems };
      }
      return null;
    })
    .filter(Boolean);


  return (
    <div className="course-builder">

      <div className='course-content'>
        <Header onAddClick={handleAddClick} onSearchChange={handleSearchChange} />


        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
            <div className="module-list">
              {modules.length === 0 ? (
                <EmptyState />
              ) : (
                filteredModules.map(module => (
                  <SortableModule
                    key={module.id}
                    module={module}
                    items={items.filter(it => it.moduleId === module.id)}
                    onEdit={handleEditModule}
                    onDelete={handleDeleteModule}
                    onAddItem={handleAddItem}
                    onDeleteItem={handleDeleteItem}
                  />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>

      </div>

      {/* sidebar content navigation */}
      <div className='course-sidebar'>
        <CourseNavigation
          modules={modules}
          items={items}
        />
      </div>

      {/* Module Modal */}
      <ModuleModal
        isOpen={isModuleModalOpen}
        onClose={handleCloseModuleModal}
        onSave={handleSaveModule}
        module={currentModule}
      />

      {/* Link Modal */}
      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={handleCloseLinkModal}
        onSave={handleSaveLink}
        moduleId={currentModuleId}
        linkId={(currentModule && currentModule.type === 'link') ? currentModule.id : null}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        onSave={handleSaveUpload}
        moduleId={currentModuleId}
        uploadId={(currentModule && currentModule.type === 'file') ? currentModule.id : null}
      />
    </div>
  );
};

export default CourseBuilder;
