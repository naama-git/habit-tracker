
/*----------------------------------------------------------------------------
 🧩 Component :AddHabitView
 📃 Description : View for add habit form
------------------------------------------------------------------------------*/

import { Modal, Form, Input, DatePicker, TimePicker, Divider, type FormInstance, Select, Checkbox, Row, Col, Button } from 'antd';
import AddHabit_SelectTag from './AddHabit_SelectTag';
import type { IHabit } from '../../../types/IHabit';
import styles from './AddHabit.module.css'
// import { useEffect, useState } from 'react';

interface AddHabitViewProps {
  open: boolean | undefined

  onCancel: () => void
  form: FormInstance
  onValuesChange?: (changedValues: any, allValues: any) => void
  onFinish: (values: IHabit) => void
  disabled: boolean

}

const AddHabitView: React.FC<AddHabitViewProps> = ({ form, onFinish, open, onCancel, disabled, onValuesChange }) => {

  //------------------------ VIEW -----------------------------//

  //------- 🎨State to manage Modal visibility -----

  const format = 'HH:mm';
  const frequencyValue = Form.useWatch('frequency', form);

  const numbers = Array.from({ length: 31 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }));

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
        centered
        okButtonProps={{
          style: { display: "none" },

        }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          form={form}
          layout="vertical"
          className={styles['form']}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          {/* --- General Info Section --- */}
          <Divider style={{ borderColor: "#daeb28" }}> General Info</Divider>

          <Form.Item
            label="Habit Name"
            name="habitName"
            rules={[{ required: true, message: `Habit Name is required` }]}
          >
            <Input size='large' />
          </Form.Item>

          <Form.Item

            label="Habit Description"
            name="description"
            rules={[{ max: 200, message: `Habit Description is required` }]}
          >
            <Input.TextArea rows={3} maxLength={200} />
          </Form.Item>


          {/* --- Schedule Section --- */}
          <Divider style={{ borderColor: "#320988" }}> Schedule</Divider>

          <Form.Item
            label="Frequency "
            name="frequency"
            rules={[{ required: true, message: `Frequency is required` }]}
          >
            <Select size='large' placeholder="Select frequency"
              options={[{ label: "Daily", value: "daily" }, { label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }]} />
          </Form.Item>

          {
            frequencyValue === 'weekly' &&
            <Form.Item
              label="Day of the Week"
              name="daysInWeek"
              rules={[{ required: true, message: `Please select a day of the week` }]}
            >
              <Select size='large' placeholder="Select day of the week"
                mode="multiple"
                options={[
                  { label: "Sunday", value: 0 },
                  { label: "Monday", value: 1 },
                  { label: "Tuesday", value: 2 },
                  { label: "Wednesday", value: 3 },
                  { label: "Thursday", value: 4 },
                  { label: "Friday", value: 5 },
                  { label: "Saturday", value: 6 },

                ]} />
            </Form.Item>
          }

          {
            frequencyValue === 'monthly' &&

            <Form.Item
              label="Day of the Month"
              name="daysInMonth"
              help="Select one or more days. if the selected day exceeds the number of days in a month, the habit will be scheduled on the last day of that month."
              rules={[{ required: true, message: "Please select at least one day of the month" }]}
              style={{ marginBottom: "20px" }}
            >

              <Checkbox.Group style={{ width: '100%' }}>
                <Row gutter={[8, 8]}>
                  {numbers.map((number) => (
                    <Col span={3} key={number.value}>
                      <Checkbox value={number.value}>{number.label}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>
          }

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: `Time is required` }]}
          >
            <TimePicker type="number" format={format} style={{ width: "100%" }} placeholder='HH:MM' showNow={true} size='large' />
          </Form.Item>

          <Form.Item
            label="Start and End Dates"
            name="dateRange"
            help="If no start date is selected, the current day will be selected by default."
          >
            <DatePicker.RangePicker
              placeholder={['Start Date', 'End Date']}
              allowEmpty={[false, true]}
              style={{ width: "100%" }}
              size='large'
            />
          </Form.Item>

          {/* --- Tags Section --- */}
          <Divider style={{ borderColor: "#daeb28" }}> Tags</Divider>

          <Form.Item

            label="Tags"
            name="tag"
            rules={[{ message: `Tags are required` }]}
          >
            <AddHabit_SelectTag variant='outlined' />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className={styles['save-button']}
              disabled={disabled}>Add</Button>
          </Form.Item>
        </Form>

      </Modal>
    </div>
  )
}

export default AddHabitView
