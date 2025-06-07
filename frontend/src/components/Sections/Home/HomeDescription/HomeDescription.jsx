import {useState} from 'react';
import {htmlContext} from "./HomeDescData.js";

function HomeDescription() {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(prev => !prev);
    };

    return (
        <section className="section-wrapper">
            <div className="container relative">
                <div
                    className={`overflow-hidden leading-[29px] transition-all duration-500 ${expanded ? 'max-h-full' : 'max-h-64'}`}
                    dangerouslySetInnerHTML={typeof htmlContext === 'string' ? { __html: htmlContext } : undefined}
                />

                {!expanded && (
                    <div
                        className="absolute top-0 left-0 right-0  bg-gradient-to-b from-transparent from-5% to-gray-100 dark:to-gray-900 w-full h-64"
                    />
                )}
                <button
                    className="primary-btn"
                    onClick={toggleExpand}
                >
                    {expanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
                </button>
            </div>
        </section>
    );
}

export default HomeDescription;