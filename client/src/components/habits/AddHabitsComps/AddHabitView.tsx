
/*----------------------------------------------------------------------------
 🧩 Component :AddHabitView
 📃 Description : View for add habit form
------------------------------------------------------------------------------*/

import { Modal, Form, Input, InputNumber, DatePicker, TimePicker, Divider } from 'antd';
import { formFields, type FormField } from './Fields/fieldsForAddHabit';
import AddHabit_SelectTag from './AddHabit_SelectTag';
import type { IHabit } from '../../../types/IHabit';
import styles from './AddHabit.module.css'

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
        return <AddHabit_SelectTag variant='outlined'/>
      default:
        return <Input size='large' />;
    }
  };

  return (
    <div className={styles['wrapper']}>
      <Modal
        title={
          <div
            className={styles['title']} >
            Add a New Habit
            </div>
        }
        className={styles['modal']}
        open={open}
        onCancel={onCancel}
        onOk={() => { form.resetFields(), clickOK() }}
        width="80%"
        centered
        okButtonProps={{
          style: { color: "black", borderRadius: "10px", fontWeight: "600", }
        }}
        cancelButtonProps={{ style: { display: "none" } }}
      >

        <Form
          form={form}
          layout="vertical"
          className={styles['form']}
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
