import {useState} from 'react';

import {LiaAngleDownSolid} from "react-icons/lia";
import {LiaAngleUpSolid} from "react-icons/lia";

function CourseDescription({text}) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(prev => !prev);
    };

    return (
        <div className="mt-10 ">
            <div className="relative">
                <div
                    className={`overflow-hidden leading-[29px] transition-all duration-500 ${expanded ? 'max-h-full' : 'max-h-40'}`}
                    dangerouslySetInnerHTML={{__html: text}}
                />

                {!expanded && (
                    <div
                        className="absolute bottom-0 right-0 left-0 h-[160px] bg-gradient-to-t from-white dark:from-primary-dark from-0% via-white/55 dark:via-primary-dark/55 dark:bg-primary-dark/50 via-70% to-white/0 dark:to-primary-dark/0 to-100%"
                    />
                )}
            </div>

            <button
                className="primary-btn"
                onClick={toggleExpand}
            >
                {expanded ? (
                    <>
                        مشاهده کمتر مطلب
                        <LiaAngleUpSolid className="text-base"/>
                    </>
                ) : (
                    <>
                        مشاهده بیشتر مطلب
                        <LiaAngleDownSolid className="text-base"/>
                    </>
                )}
            </button>
        </div>
    );
}

export default CourseDescription;