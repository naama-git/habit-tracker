
/*----------------------------------------------------------------------------
 🧩 Component :AddHabit_SelectTags
 📃 Description : Open a select box for selecting tags for habits. enables multiple choice.
------------------------------------------------------------------------------*/
import React, {  useRef, useState,useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space, Tag } from 'antd';
import type { InputRef, SelectProps } from 'antd';
import { useHabitContext } from '../../../context/HabitContext'



const AddHabit_SelectTag: React.FC = () => {

    //----- 🎨array of tags for presenting and adding -----
    const { items, setItems,userTags,setUserTags } = useHabitContext()

    // ----- 🎨custume name ------
    const [name, setName] = useState('');

    // ----- state for focus -----
    const inputRef = useRef<InputRef>(null);

    const [disable, setDisable] = useState(true)

    // ---- 🎨for tags view ----
    type TagRender = SelectProps['tagRender'];

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // -----🧠 when user adds a new tag, the name state changes -----
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDisable(false)
        setName(event.target.value);
    };

    // ----- 🧩 presenting the selected values as tags -----
    const tagRender: TagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginInlineEnd: 4, backgroundColor: "#320988" }}
            >
                {label}
            </Tag>
        );
    };


    // ----- 🧠 Adds custume tag to items
    const addItem = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();

        if (!name.trim()) return;

        //  מוסיפים את התגית למערך האפשרויות אם היא חדשה
        const newItem = { value: name };
        if (!items.find((item: { value: string }) => item.value === name)) {
            setItems([...items, newItem]);
            console.log("tags:", items);
            

        }

        //  מוסיפים את התגית למערך הנבחרים
        setSelectedTags([...selectedTags, name]);
        setUserTags([...userTags,name])
        
        // איפוס input
        setName('');
        setDisable(true);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };
    useEffect(()=>{
        console.log("userTags:", userTags);
        
    },[userTags])

    return (

        <div style={{ width: "100%" }}>
            <Select
                style={{ width: "100%" }}
                placeholder="Add tags..."
                mode='multiple'
                tagRender={tagRender}
                value={selectedTags}
                onChange={(vals) =>{ setSelectedTags(vals); setUserTags(vals)}}
                size='large'
                popupRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                            <Input
                                placeholder="Custumize your tag"
                                ref={inputRef}
                                value={name}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                                onPressEnter={(e) => addItem(e)}
                            />
                            <Button type="text" icon={<PlusOutlined />} onClick={(e) => addItem(e)} disabled={disable}>
                                Add new tag
                            </Button>
                        </Space>
                    </>
                )}
                options={items}
            />
        </div>

    )
}

export default AddHabit_SelectTag
