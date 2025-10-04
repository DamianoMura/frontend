import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const NewPartecipantForm = () => {
	const [activeForm, setActiveForm] = useState(null);
	return (
		<div>
			{/* Form */}
			<div className="accordion new-form-accordion my-3">
				<div className="accordion-item">
					<h2 className="accordion-header">
						<button
							className={`accordion-button ${
								activeForm === true ? "collapsed" : ""
							}`}
							type="button"
							onClick={() => setActiveForm(!activeForm)}
						>
							<FontAwesomeIcon icon={faUserPlus} />
							&nbsp;&nbsp;Aggiungi Partecipante
						</button>
					</h2>
					<div
						className={`accordion-collapse collapse ${
							activeForm === true ? "show" : ""
						}`}
					>
						<div className="accordion-body">
							<div className="card-body">
								<form onSubmit="">
									<div className="mb-3">
										<label>Nome</label>
										<input
											type="text"
											name="name"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="Inserisci Nome"
										/>
										<label>Cognome</label>
										<input
											type="text"
											name="surname"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="Inserisci Cognome"
										/>
										<label>Cellulare</label>
										<input
											type="number"
											name="phone"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="Inserisci Numero di Telefono"
										/>
										<label>Email</label>
										<input
											type="text"
											name="email"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="Inserisci Email"
										/>
										<label>Codice Fiscale</label>
										<input
											type="text"
											name="fiscalCode"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="Inserisci Codice Fiscale"
										/>
										<button type="submit" class="btn btn-primary">
											Salva
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPartecipantForm;
