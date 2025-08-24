
export default function CourseNavigation({ modules, items }) {
    return (
        <div className="sidebar">
            <ul className="module-list">
                {modules.map((module) => (
                    <li key={module.id} className="module">
                        {/* Module Heading */}
                        <a href={`#${module.id}`} className="sidebar-module-title">{module.title}</a>

                        {/* Items belonging to this module */}
                        <ul className="item-list">
                            {items
                                .filter((item) => item.moduleId === module.id)
                                .map((item) => (
                                    <li key={item.id} className="item nav-submodule-title">
                                        <a href={`#${module.id}`}>{item.title}</a>
                                    </li>
                                ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}
