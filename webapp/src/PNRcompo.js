import axios from "axios";
import React from "react";
import './PNRStyle.css'

class PNRComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trainName: "",
            trainNo: [],
            departureTime: [],
            seatsAvailable: false,
            price: "",
            delayedBy:false
        }
    }

    handleChange = (event) => {
        this.setState(
            {
                trainName: event.target.value
               
            }
        )
    }

    handleSubmit = () => {

        this.setState(
            {
                departureTime: [],
                seatsAvailable: 
                "sleeper,AC",
                price: "",
                delayedBy:15
            }
        )
        const options =
        {
            method: 'GET',
            // url: 'http://20.244.56.144:80/train/trains',
            url:'api/Employee/GetPnrDetails',
            params: { trainName: this.state.trainName,
                trainNo: this.state.trainNo },
            // headers:{'X-RapidAPI-Key':'08d558a2f2msh89912308fa1d13fp16e322jsn23960f0abdbe','X-RapidAPI-Host':'irctc1.p.rapidapi.com'}

        }

        axios.request(options).then(responnse => {
            console.log(responnse.data)
            this.setState(
                {
                    trainName: response.data.data,
                    seatsAvailable: response.data.data.seatsAvailable,
                    OnButtonClicked: true
                }
            );
        }).catch(error => {
            this.setState(
                {
                    ErrorMessage: "Please enter the correct PNR...",
                    IsErrorOccurred:true
                }
            )
        });
    }

    render() {
        return (
            <div className="app">
                <h2>This is Engineer's desk Railway Website</h2>
                <h3>Please enter your PNR Number</h3>
                <div>
                    <input type="text" id="pnr" name="pnr" value={this.state.PNRNumber} onChange={this.handleChange} />
                    <button type="submit" onClick={this.handleSubmit}>Search</button>
                </div>

                {this.state.IsErrorOccurred ? <h5 className="errorMessage">{this.state.ErrorMessage}</h5> : this.state.OnButtonClicked && <div>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    
                                    <th>Train Number</th>
                                    <th>Train Name</th>
                                    <th>Departure Time</th>
                                    <th>Seats available</th>
                                    <th>Price</th>
                                    <th>Delayed by</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.PNRDetails.TrainName}</td>
                                    <td>{this.state.PNRDetails.TrainNo}</td>
                                    <td>{this.state.PNRDetails.Seats available}</td>
                                    <td>{this.state.PNRDetails.Price}</td>
                                    <td>{this.state.PNRDetails.Delayed by}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Person No.</th>
                                    <th>Coach</th>
                                    <th>Berth</th>
                                    <th>Booking Status</th>
                                    <th>Current Status</th>
                                    <th>Precentage Prediction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.PassengerStatus.map((passenger, index) =>
                                    <tr key={index}>
                                        <td>{passenger.ClientName}</td>
                                        <td>{passenger.ClientId}</td>
                                        <td>{passenger.ownerName}</td>
                                        <td>{passenger.OwnerId}</td>
                                        <td>{passenger.rollno}</td>
                                        <td>{passenger.Clientserver}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>}

            </div>
        )
    }
}

export default PNRComponent;