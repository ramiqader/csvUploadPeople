import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PeopleList() {
    const [people, setPeople] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPeople = async (page) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/list/?page=${page}`);
            setPeople(res.data.people);
            setTotalPages(res.data.total_pages);
            setCurrentPage(res.data.current_page);
        } catch (err) {
            console.error("Error fetching people:", err);
        }
    };

    useEffect(() => {
        fetchPeople(currentPage);
    }, [currentPage]);

    return (
        <div>
            <h2>List of People</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((person, index) => (
                        <tr key={index}>
                            <td>{person.first_name}</td>
                            <td>{person.last_name}</td>
                            <td>{person.email}</td>
                            <td>{person.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PeopleList;
