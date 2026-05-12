
import React, { useMemo } from 'react';
import Card from '../components/shared/Card';
import { useLanguage } from '../context/LanguageContext';
import { mockStudyPlanTasks } from '../services/mockData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import type { StudyPlanTask } from '../types';

// Helper to calculate days between two dates
const daysBetween = (date1: Date, date2: Date): number => {
    return Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
};

const StudyPlanGanttChart: React.FC<{ tasks: StudyPlanTask[] }> = ({ tasks }) => {
    const chartData = useMemo(() => {
        if (!tasks || tasks.length === 0) return [];
        
        const projectStartDate = tasks.reduce((min, task) => task.start < min ? task.start : min, tasks[0].start);
        
        return tasks.map(task => {
            const startOffset = daysBetween(projectStartDate, task.start);
            const duration = daysBetween(task.start, task.end);
            return {
                name: task.name,
                time: [startOffset, startOffset + duration],
                startOffset,
                duration
            };
        }).reverse(); // Reverse to show first task at the top
    }, [tasks]);

    const dateFormatter = (date: Date) => date.toLocaleDateString('en-CA', { month: 'short', year: 'numeric' });
    const projectStartDate = tasks.reduce((min, task) => task.start < min ? task.start : min, tasks[0].start);
    const projectEndDate = tasks.reduce((max, task) => task.end > max ? task.end : max, tasks[0].end);
    const totalDays = daysBetween(projectStartDate, projectEndDate);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
                <XAxis type="number" domain={[0, totalDays]} tickFormatter={(tick) => {
                    const date = new Date(projectStartDate);
                    date.setDate(date.getDate() + tick);
                    return dateFormatter(date);
                }}/>
                <YAxis type="category" dataKey="name" width={150} tick={{ fill: '#a0aec0' }}/>
                <Tooltip
                    contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value: number, name: string, props) => {
                       if (name === 'duration') {
                           const task = tasks.find(t => t.name === props.payload.name);
                           if (task) {
                            return [`${task.start.toLocaleDateString()} - ${task.end.toLocaleDateString()}`, 'Period'];
                           }
                       }
                       return null;
                    }}
                />
                <Legend />
                <Bar dataKey="startOffset" stackId="a" fill="transparent" stroke="transparent" />
                <Bar dataKey="duration" stackId="a" fill="#d97706" radius={[4, 4, 4, 4]} barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    );
};

const StudyPlanPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <Card title={t('your_study_plan')}>
      <StudyPlanGanttChart tasks={mockStudyPlanTasks} />
    </Card>
  );
};

export default StudyPlanPage;