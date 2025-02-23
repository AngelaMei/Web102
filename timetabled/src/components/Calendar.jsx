import React from "react";
import Event from './Event'

const Calendar = () => {
//       const hours = [
//     "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm"
//   ];
  return (
    <div className="Calendar">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td className="time">8:00 AM</td>
                <Event event='Breakfast' color ='green'/>
                <td></td>
                <td></td>
                <td></td>
                <Event event='Yolk 🍳' color ='red'/>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="time">9:00 AM</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="time">10:00 AM</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="time">11:00 AM</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Calendar;