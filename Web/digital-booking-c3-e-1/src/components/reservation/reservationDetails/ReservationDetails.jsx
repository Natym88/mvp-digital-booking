import React, { useState } from "react";
import InputWithLabel from "../../common/input/InputWithLabel";
import styles from "./ReservationDetails.module.css";
import { BsTicketPerforated } from "react-icons/bs";
import "moment/locale/es";
import CalendarProducts from "../../resources/Calendar/CalendarProducts";
import { BiEdit } from "react-icons/bi";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
  insuranceSelected,
  setInsuranceSelected,
}) => {

  const inputStartDate = selectedStartDate || startDate;
  const inputEndDate = selectedEndDate || endDate;

  const formattedStartDate = format(new Date(inputStartDate), "dd 'de' MMMM 'de' yyyy", { locale: es });
  const formattedEndDate = format(new Date(inputEndDate), "dd 'de' MMMM 'de' yyyy", { locale: es });

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
              locale="es"
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
              className={`${styles.preferenceOption} ${delivery === "recoger en tienda" ? styles.active : ""
                }`}
              onClick={() => handlePreferenceChange("recoger en tienda")}
            >
              Recoger
            </div>
            <div
              className={`${styles.preferenceOption} ${delivery === "entrega" ? styles.active : ""
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
                checked={equipmentPreferences.some((equipment) => equipment.name === "Casco")}
                onChange={() => handleEquipmentPreferenceToggle({name:"Casco",price:10})}
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
                checked={equipmentPreferences.some((equipment) => equipment.name === "mapas")}
                onChange={() => handleEquipmentPreferenceToggle({name:"mapas",price:2})}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentmapas" className={styles.preferenceText}>
                Mapa de rutas <span>+ $2</span>
              </label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentguantes"
                checked={equipmentPreferences.some((equipment) => equipment.name === "guantes")}
                onChange={() => handleEquipmentPreferenceToggle({name:"guantes",price:5})}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentguantes" className={styles.preferenceText}>
                Guantes protectores <span>+ $5</span>
              </label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentrodilleras"
                checked={equipmentPreferences.some((equipment) => equipment.name === "rodilleras")}
                onChange={() => handleEquipmentPreferenceToggle({name:"rodilleras",price:8})}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentrodilleras" className={styles.preferenceText}>
                Rodilleras y coderas <span>+ $8</span>
              </label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentmochilas"
                checked={equipmentPreferences.some((equipment) => equipment.name === "mochilas")}
                onChange={() => handleEquipmentPreferenceToggle({name:"mochilas",price:5})}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentmochilas" className={styles.preferenceText}>
                Mochilas o bolsas <span>+ $5</span>
              </label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentreparacion"
                checked={equipmentPreferences.some((equipment) => equipment.name === "reparacion")}
                onChange={() => handleEquipmentPreferenceToggle({name:"reparacion",price:5})}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentreparacion" className={styles.preferenceText}>
                Kit de reparación <span>+ $5</span>
              </label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentemergencia"
                checked={equipmentPreferences.some((equipment) => equipment.name === "emergencia")}
                onChange={() => handleEquipmentPreferenceToggle({name:"emergencia",price:7})}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentemergencia" className={styles.preferenceText}>
                Kit de emergencia <span>+ $7</span>
              </label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentchaleco"
                checked={equipmentPreferences.some((equipment) => equipment.name === "chaleco")}
                onChange={() => handleEquipmentPreferenceToggle({name:"chaleco",price:10})}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentchaleco" className={styles.preferenceText}>
                Chaleco salvavidas <span>+ $10</span>
              </label>
            </div>
            <div className={styles.equipmentPreference}>
              <input
                type="checkbox"
                id="equipmentluces"
                checked={equipmentPreferences.some((equipment) => equipment.name === "luces")}
                onChange={() => handleEquipmentPreferenceToggle({name:"luces",price:5})}
                className={styles.equipmentCheckbox}
              />
              <label htmlFor="equipmentluces" className={styles.preferenceText}>
                Luces de seguridad <span>+ $5</span>
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
        <div className={styles.preferenceContainer}>
          <span className={styles.preferenceLabel}>
            Desea adquirir un seguro: + 10% adicional sobre el valor total de la reserva
          </span>
          <div>
            <input
              type="checkbox"
              id="insuranceOptionYes"
              name="insuranceOption"
              value="yes"
              checked={insuranceSelected}
              onChange={() => setInsuranceSelected(true)}
              className={styles.equipmentCheckbox}
            />
            <label htmlFor="insuranceOptionYes" className={styles.insuranceOptionLabel}>
              Sí
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="insuranceOptionNo"
              name="insuranceOption"
              value="no"
              checked={!insuranceSelected}
              onChange={() => setInsuranceSelected(false)}
              className={styles.equipmentCheckbox}
            />
            <label htmlFor="insuranceOptionNo" className={styles.insuranceOptionLabel}>
              No
            </label>
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