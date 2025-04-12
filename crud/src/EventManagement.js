// Perform all the CRUD operations on the given entity Event Management system..Add data by id search data by id update data by id delete data by id use axios , useeffects,usestate 
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './EventManagement.css'



const Displayform =({details, onEdit, onDelete})=>{
    if(details.length ===0){
        return(
            <tr>
                <td colSpan={3}>No data found</td>
            </tr>
        )
    }
    return(
        <div className="App">
        <table>
            <thead>
                <tr>
                    <th>EventName</th>
                    <th>EventDate</th>
                    <th>EventTime</th>
                    <th>EventLocation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {details.map((detail) => (
                    <tr key={detail.id}>
                        <td>{detail.EventName}</td>
                        <td>{detail.EventDate}</td> 
                        <td>{detail.EventTime}</td>         
                        <td>{detail.EventLocation}</td>
                        <td>
                            { <button onClick={() => onEdit(detail)}>Edit</button> }
                            {<button onClick={() => onDelete(detail.id)}>Delete</button>}
                        </td>
                    </tr>               
                ))}
            </tbody>
        </table>
        </div>
    )
}
function EventManagement() {
    const [detail, setDetail] = useState({
        EventName: '',
        EventDate: '',
        EventTime: '',
        EventLocation: ''
    })

    const [details, setDetails] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/detail')
            .then(response => {
                setDetails(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])  

    const handleEdit = (detail) => {
        setDetail(detail)
    }

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this data?'))
        axios.delete(`http://localhost:5000/detail/${id}`)
            .then(response => {
                setDetails(details.filter(detail => detail.id !== id))
            })
            .catch(error => {
                console.log(error)
            })

    }

    const handlesubmit = (e) => {
        e.preventDefault()
        if (detail.id) {
            axios.put(`http://localhost:5000/detail/${detail.id}`, detail)
                .then(response => {
                    setDetails(details.map(item => item.id === detail.id ? response.data : item))
                    setDetail({
                        EventName: '',
                        EventDate: '',
                        EventTime: '',
                        EventLocation: ''
                    })
                    alert('Data updated successfully')
                })
                .catch(error => {
                    console.log(error)
                })
            return
        }
        axios.post('http://localhost:5000/detail', detail)
            .then(response => {
                setDetails([...details, response.data])
                setDetail({
                    EventName: '',
                    EventDate: '',
                    EventTime: '',
                    EventLocation: ''
                })
                alert('Data added successfully')
            })
            .catch(error => {
                console.log(error)
            })
    }    

    return (
        <div className='tab'>
        <div>
            <form onSubmit={handlesubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>EventName</th>
                            <th>EventDate</th>
                            <th>EventTime</th>
                            <th>EventLocation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" value={detail.EventName} onChange={(e) => setDetail({ ...detail, EventName: e.target.value })} /></td> 
                            <td><input type="text" value={detail.EventDate} onChange={(e) => setDetail({ ...detail, EventDate: e.target.value })} /></td>
                            <td><input type="text" value={detail.EventTime} onChange={(e) => setDetail({ ...detail, EventTime: e.target.value })} /></td>
                            <td><input type="text" value={detail.EventLocation} onChange={(e) => setDetail({ ...detail, EventLocation: e.target.value })} /></td>
                            <td><button type="submit">{detail.id ? 'Update' : 'Add'}</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <Displayform details={details} onEdit={handleEdit} onDelete={handleDelete} />      
        </div>
        </div>
    )
}

export default EventManagement;

    
    

           

