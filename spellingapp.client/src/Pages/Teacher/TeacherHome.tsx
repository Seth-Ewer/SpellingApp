import { useState } from 'react';
import { Collapse, CollapseProps } from 'antd';

function TeacherHome() {



    const displayItems: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Classrooms',
            children: <p>temp</p>
        },
        {
            key: '2',
            label: 'Students',
            children: <p>temp</p>
        },
        {
            key: '3',
            label: 'Tests',
            children: <p>temp</p>
        },
    ]

    return (
        <div>

            <div>

                <Collapse items={displayItems} defaultActiveKey={['1']} />

            </div>

            <div>
                Refresh + delete buttons
            </div>
        </div>
    );
}

export default TeacherHome;