const Calendar = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Senin</th>
            <th>Selasa</th>
            <th>Rabu</th>
            <th>Kamis</th>
            <th>Jumat</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="bg-base-200">
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
          </tr>
          {/* row 2 */}
          <tr>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
          </tr>
          {/* row 3 */}
          <tr>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
          </tr>
          {/* row 4 */}
          <tr>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
            <td>Course 1 (250)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

};

export default Calendar;