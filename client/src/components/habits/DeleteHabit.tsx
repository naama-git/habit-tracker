
/*----------------------------------------------------------------------------
 🧩 Component : Delete Habit
 📃 Description : Deleting habit by ID
------------------------------------------------------------------------------*/

import React, { useEffect } from 'react'
import { Button, Popconfirm } from 'antd'
import type { PopconfirmProps } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import { useNotificationContext } from '../../context/NotificationContext';
import { useHabitStore } from '../../store/HabitStore';

// ----- props -----
type DeleteHabitProps = {
    _id: string | undefined
}

const DeleteHabit: React.FC<DeleteHabitProps> = ({ _id }) => {

    // ----- 🎨 state for notification
    const { contextHolder, openNotification } = useNotificationContext()
    const { deleteHabit, error } = useHabitStore()

    // delete habit
    const deleteH = async () => {
        if (!_id || _id === undefined) return;
        try {
            await deleteHabit(_id)
            openNotification("success", "habit deleted successfully")
        }
        catch(err){
            console.log(error);
            openNotification()
        }
    }

    // confirm the deleting
    const confirm: PopconfirmProps['onConfirm'] = () => {
        deleteH()
    };

    useEffect(()=>{
        console.log("on delete habit");
        
    },[])

    return (
        <div>
            {contextHolder}
            <Popconfirm
                title="Delete the task"
                description="Are you sure you want to delete this task?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No">
                <Button icon={<DeleteOutlined />} style={{ backgroundColor: "white", border: "none", boxShadow: "none", fontSize: "20px" }}></Button>
            </Popconfirm>
        </div>
    )
}

export default DeleteHabit
