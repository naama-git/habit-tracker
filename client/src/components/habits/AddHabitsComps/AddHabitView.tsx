
/*----------------------------------------------------------------------------
 🧩 Component :AddHabitView
 📃 Description : View for add habit form
------------------------------------------------------------------------------*/

// import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, TimePicker, Divider } from 'antd';
import { formFields, type FormField } from './Fields/fieldsForAddHabit';
import AddHabit_SelectTag from './AddHabit_SelectTag';
import type { IHabit } from '../../../types/IHabit';

interface AddHabitViewProps {
  open: boolean | undefined
  onCancel: () => void
  handleChange: (field: keyof (IHabit), value: any) => void
  changeDates: (value?: { a: Date, b: Date }) => void
  clickOK: () => void
}

const AddHabitView: React.FC<AddHabitViewProps> = ({ handleChange, changeDates, clickOK, open, onCancel }) => {

  //------------------------ VIEW -----------------------------//

  //------- 🎨State to manage Modal visibility -----
  // const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const format = 'HH:mm';


  // ------ 🧩 returns the fields with match data inputs
  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return <Input size='large' onChange={(e) => { handleChange('habitName', e.target.value) }} />;
      case "textarea":
        return <Input.TextArea rows={3} onChange={(e) => { handleChange('description', e.target.value) }} />;
      case "number":
        return <InputNumber style={{ width: "100%" }} min={1} max={30} size='large' onChange={(e) => { handleChange('frequency', e?.valueOf()) }} />;
      case "date":
        return <DatePicker.RangePicker
          placeholder={['Start Date', 'End Date']}
          allowEmpty={[false, true]}
          onChange={(date, dateString) => {

            if (date) {
              const a = date[0]?.toDate()
              const b = date[1]?.toDate()
              // console.log({ a, b });

              changeDates({ a, b })
            }

          }}
          style={{ width: "100%" }}
          size='large'
        />
      case "time":
        return <TimePicker format={format} style={{ width: "100%" }} placeholder='HH:MM' showNow={true} size='large'
          onChange={(e) => handleChange('time', e.format("HH:mm"))} />;
      case "select":
        return <AddHabit_SelectTag />
      default:
        return <Input size='large' />;
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "30px 0", }}>
      <Modal
        title={
          <div
            style={{ fontSize: "1.4rem", fontWeight: "bold", textAlign: "center" }}
          >
            Add a New Habit
            
          </div>
        }
        open={open}
        onCancel={onCancel}
        onOk={() => { form.resetFields(), clickOK() }}
        width="80%"
        style={{ maxWidth: 550 }}
        centered
        okButtonProps={{
          style: { color: "black", borderRadius: "10px", fontWeight: "600", }
        }}
        cancelButtonProps={{ style: { display: "none" } }}
      >

        <Form
          form={form}
          layout="vertical"
          style={{
            // background: "#f3f2f2ff",
            padding: "20px 30px",
            borderRadius: "16px",
          }}
        >
          {/* --- General Info Section --- */}
          <Divider style={{ borderColor: "#daeb28" }}> General Info</Divider>
          {formFields.slice(0, 2).map((field) => (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={[{ required: field.required, message: `${field.label} is required` }]}

            >
              {renderField(field)}
            </Form.Item>
          ))}

          {/* --- Schedule Section --- */}
          <Divider style={{ borderColor: "#320988" }}> Schedule</Divider>
          {formFields.slice(2, 5).map((field) => (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={[{ required: field.required, message: `${field.label} is required` }]}
            >
              {renderField(field)}
            </Form.Item>
          ))}

          {/* --- Tags Section --- */}
          <Divider style={{ borderColor: "#daeb28" }}> Tags</Divider>
          {formFields.slice(5).map((field) => (
            <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={[{ required: field.required, message: `${field.label} is required` }]}
            >
              {renderField(field)}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </div>
  )
}

export default AddHabitView
