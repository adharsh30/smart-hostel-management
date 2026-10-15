
import RoomCard from "./RoomCard";
import "./FloorCard.css";

function FloorCard({ floor }) {
  return (
    <section className="floor-card">
      <div className="floor-title">
        <div>
          <h2>🏢 Floor {floor.floorNumber}</h2>

          <p>
            {floor.rooms.length} Rooms Available
          </p>
        </div>
      </div>

      <div className="rooms-grid">
        {floor.rooms.map((room) => (
          <RoomCard
            key={room.roomNumber}
            room={room}
          />
        ))}
      </div>
    </section>
  );
}

export default FloorCard;