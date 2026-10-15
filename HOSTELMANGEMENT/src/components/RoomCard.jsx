import "./RoomCard.css";

function RoomCard({ room }) {
  const occupiedBeds = room.beds.filter(
    (bed) => bed.status === "occupied"
  );

  const vacantBeds = room.beds.filter(
    (bed) => bed.status === "vacant"
  );

  return (
    <div className="room-card">

      <div className="room-header">

        <h3>
          Room {room.roomNumber}
        </h3>

        <span className="room-status">
          {occupiedBeds.length}/{room.beds.length}
        </span>

      </div>


      <div className="beds-container">

        {room.beds.map((bed) => {

          const isOccupied = bed.status === "occupied";

          return (
            <div
              key={bed._id}
              className={`bed ${
                isOccupied
                  ? "occupied-bed"
                  : "vacant-bed"
              }`}
              title={
                isOccupied
                  ? "Occupied"
                  : "Vacant"
              }
            >
              🛏️
            </div>
          );

        })}

      </div>


      <div className="room-footer">

        <span>
          🟢 {vacantBeds.length} Vacant
        </span>

        <span>
          🔴 {occupiedBeds.length} Occupied
        </span>

      </div>

    </div>
  );
}

export default RoomCard;