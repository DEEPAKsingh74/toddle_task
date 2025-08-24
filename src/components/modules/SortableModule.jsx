import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ModuleCard from "./ModuleCard";

const SortableModule = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props.module.id,
        data: { type: "module" },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} >
            <ModuleCard {...props} attributes={attributes} listeners={listeners} />
        </div>
    );
};

export default SortableModule;
