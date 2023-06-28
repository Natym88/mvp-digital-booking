import React from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import styles from "./ReservationDetails.module.css";
import { BsTicketPerforated } from "react-icons/bs";
import moment from "moment";
import "moment/locale/es";
import CalendarProducts from "../../resources/Calendar/CalendarProducts";
import { BiEdit } from "react-icons/bi";
// import { RentsService } from "../../../shared/services/RentsService"

const ReservationDetails = ({
  product,
  startDate,
  endDate,
  selectedStartDate,
  selectedEndDate,
  delivery,
  equipmentPreferences,
  comment,
  address,
  handlePreferenceChange,
  handleEquipmentPreferenceToggle,
  handleCommentChange,
  handleAddressChange,
  handleStartDateChange,
  handleEndDateChange,
  toggleCalendar,
  isCalendarOpen,
  handleSelectDates,
}) => {
  const inputStartDate = selectedStartDate || startDate;
  const inputEndDate = selectedEndDate || endDate;

  const formattedStartDate = moment(inputStartDate).format(
    "DD [de] MMMM [de] YYYY"
  );
  const formattedEndDate = moment(inputEndDate).format(
    "DD [de] MMMM [de] YYYY"
  );

  console.log(product.rents);
  return (
    <>
      <div className={styles.container}>
        {product && (
          <>
            <div className={styles.header}>
              <div className={styles.headerIcon}>
                <BsTicketPerforated />{" "}
              </div>
              <h3 className={styles.title}>Detalles de la reserva</h3>
            </div>
          </>
        )}
        <div className={styles.containerInputs}>
          <span className={styles.preferenceLabel}>Fechas de reserva</span>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainer}>
              <InputWithLabel
                isEditable={false}
                value={formattedStartDate}
                onChange={(e) => handleStartDateChange(e.target.value)}
                label="Fecha de inicio"
                className={styles.input}
              >
                Fecha de inicio
              </InputWithLabel>
            </div>
            <div className={styles.inputContainer}>
              <InputWithLabel
                isEditable={false}
                value={formattedEndDate}
                onChange={(e) => handleEndDateChange(e.target.value)}
                label="Fecha de fin"
                className={styles.input}
              >
                Fecha de fin
              </InputWithLabel>
            </div>
            <div className={styles.calendarButton}></div>
            <button
              className={styles.buttonContainerEdit}
              onClick={toggleCalendar}
            >
              <div className={styles.calendarButton}>
                <BiEdit className={styles.calendarButtonIcon} />
              </div>
            </button>
          </div>
          {isCalendarOpen && (
            <CalendarProducts
              selectedDates={{
                startDate: selectedStartDate,
                endDate: selectedEndDate,
              }}
              onSelectDates={handleSelectDates}
              rents={product.rents}
            />
          )}
        </div>

        <div className={styles.preferenceContainer}>
          <span className={styles.preferenceLabel}>
            Preferencias de entrega
          </span>
          <div className={styles.preferenceOptions}>
            <div
              className={`${styles.preferenceOption} ${
                delivery === "recoger en tienda" ? styles.active : ""
              }`}
              onClick={() => handlePreferenceChange("recoger en tienda")}
            >
              Recoger
            </div>
            <div
              className={`${styles.preferenceOption} ${
                delivery === "entrega" ? styles.active : ""
              }`}
              onClick={() => handlePreferenceChange("entrega")}
            >
              Servicio de entrega
            </div>
          </div>
          {delivery === "entrega" && (
            <div className={styles.addressContainer}>
              <InputWithLabel
                value={address}
                onChange={handleAddressChange}
                label="Dirección de envío"
                className={styles.input}
              >
                Dirección de envío
              </InputWithLabel>
              <span>
                * Debe seleccionar una direccion de envio para continuar
              </span>
            </div>
          )}
        </div>
        <div className={styles.preferenceContainer}>
          <span className={styles.preferenceLabel}>
            Equipamiento adicional:
          </span>
          <div className={styles.equipmentPreferences}>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentcasco"
                checked={equipmentPreferences.includes("casco")}
                onChange={() => handleEquipmentPreferenceToggle("casco")}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentcasco" className={styles.preferenceText}>
                Casco <span>+ $10</span>
              </label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentmapas"
                checked={equipmentPreferences.includes("mapas")}
                onChange={() => handleEquipmentPreferenceToggle("mapas")}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentmapas" className={styles.preferenceText}>
                Mapa de rutas <span>+ $2</span>
              </label>
            </div>
          </div>
          <div className={styles.transparencyNote}>
            <p>
              <span>*</span> Recopilamos tus preferencias de equipamiento
              adicional para asegurarnos de que tengas todo lo necesario para
              disfrutar de tu actividad al máximo.
            </p>
          </div>
        </div>

        <div className={styles.commentContainer}>
          <label className={styles.commentLabel}>Comentarios:</label>
          <textarea
            className={styles.commentInput}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Deja tus comentarios aquí..."
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default ReservationDetails;
