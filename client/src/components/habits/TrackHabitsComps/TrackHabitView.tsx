import { Calendar, Card, Checkbox, Spin, type CalendarProps } from 'antd'
import React, { useEffect, useMemo } from 'react'
import type { ITrack } from '../../../types/ITrack'
import styles from './TrackHabit.module.css'
import dayjs, { Dayjs } from 'dayjs'



interface TrackHabitViewProps {
    track: ITrack[] | undefined
    currentTrack: ITrack | undefined
    onselect: (logDate: Dayjs | undefined, done: boolean | undefined) => void
    loading: boolean
    checDisabled: (selectedDate: Dayjs) => boolean
}



const TrackHabitView: React.FC<TrackHabitViewProps> = ({ track, loading, checDisabled }) => {


    const dates = useMemo(() => {
        if (!track || track.length === 0) return []
        return track
            .map(tracker => {
                // console.log("tracker",tracker.logDate);
                return dayjs(tracker.logDate).format('YYYY-MM-DD')
            })
    }, [track]);


    useEffect(() => {
        console.log('dates', dates);
    }, [dates])

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {


        if (info.type === 'date') {
            const formattedCurrent = current.format('YYYY-MM-DD');

            if (dates.includes(formattedCurrent)) {
                return (
                    <div style={{ border: "1px blue solid", width: "100%", height: "100%" }}></div>
                );
            }
            else
                return <div style={{ border: `1px blue solid`, width: "100%", height: "100%" }}></div>
                // return <Checkbox checked={false} />

        }
        return <div ></div>
    };

    return (
        <div className={styles['container']}>
            <div className={styles['card-wrapper']}>
                <Card className={styles['habit-card']}>

                    <Spin spinning={loading}>
                        <Calendar fullscreen={false} cellRender={cellRender} />
                    </Spin>


                </Card>

            </div>


        </div>
    )
}

export default TrackHabitView
