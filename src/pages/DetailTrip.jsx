import trips from "../data/db";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ParticipantCard from "../components/ParticipantCard";
import NewPartecipantForm from "../components/NewPartecipantForm";
import "../styles/DetailTrip.css";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faArrowsTurnRight } from "@fortawesome/free-solid-svg-icons";

const DetailTrip = () => {
	const { id } = useParams();
	const [currentTrip, setCurrentTrip] = useState(null);
	const [filteredParticipants, setFilteredParticipants] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		// trova il trip
		const trip = trips.find((trip) => trip.id == id);
		setCurrentTrip(trip);

		// inizializza i partecipanti
		if (trip) {
			setFilteredParticipants(trip.participants);
		}
	}, [id]);

	useEffect(() => {
		if (currentTrip) {
			const tempParticipants = currentTrip.participants.filter((p) =>
				`${p.name} ${p.surname}`.toLowerCase().includes(search.toLowerCase())
			);
			setFilteredParticipants(tempParticipants);
		}
	}, [search, currentTrip]);

	if (!currentTrip) {
		return <p>Loading...</p>;
	}

	return (
		<div className="container">
			<div className="row">
				{/* Search */}
				<div className="col-12 my-3">
					<form
						className="d-flex"
						role="search"
						onSubmit={(e) => e.preventDefault()}
					>
						<input
							className="form-control me-2"
							type="search"
							placeholder="Cerca partecipante..."
							aria-label="Cerca"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</form>
				</div>
			</div>

			{/* Participant */}
			<div className="col-12">
				<h2 className="my-3">
					<FontAwesomeIcon icon={faArrowsTurnRight} /> {currentTrip.name}{" "}
				</h2>
				<h3>
					<FontAwesomeIcon icon={faUsers} /> &nbsp;Partecipanti
				</h3>
				{/* Mostra il form solo se non c'è ricerca in corso */}
				{search.trim() === "" && <NewPartecipantForm />}
				<ParticipantCard participants={filteredParticipants} />
			</div>
		</div>
	);
};

export default DetailTrip;
