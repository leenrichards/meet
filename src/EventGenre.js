import React, { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";


export const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getData = () => {
            const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
            const data = genres.map((genre) => {
                const value = events.filter((event) => event.summary.split(' ').includes(genre)).length;
                return { name: genre, value };
            });
            return data;
        };
        setData(() => getData());
    }, [events]);

    return (
        <ResponsiveContainer height={400} >
            <PieChart margin-left={200} height={400} width={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => ` ${name} ${(percent * 100).toFixed(0)}%`}
                >
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
};

export default EventGenre;