import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NewTripForm = () => {
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
						><FontAwesomeIcon icon={faPlus} size="2xs" /><FontAwesomeIcon icon={faLocationDot} />
							 Aggiungi Viaggio
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
										<label>Nome viaggio</label>
										<input
											type="text"
											name="name"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="Inserisci Descrizione Viaggio"
										/>
										<label>Destinazione</label>
										<input
											type="text"
											name="name"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="Inserisci Città"
										/>
										<label>Data Inizio</label>
										<input
											type="text"
											name="name"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="yyyy-mm-dd"
										/>
										<label>Data Fine</label>
										<input
											type="text"
											name="name"
											className="form-control mb-2"
											value=""
											onChange=""
											placeholder="yyyy-mm-dd"
										/>
										<label for="formFile" class="form-label">
											Immagine
										</label>
										<input
											class="form-control mb-2"
											type="file"
											id="formFile"
										></input>
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

export default NewTripForm;
