// src/features/pgina-de-reserva/utils/dateUtils.ts

/**
 * Convierte una fecha en formato ISO a una cadena de hora localizada.
 * @param isoDateString - La fecha en formato ISO (ej. "2025-07-15T14:00:00.000Z").
 * @param timeZone - La zona horaria del cliente (ej. "America/New_York").
 * @returns La hora formateada en la zona horaria especificada (ej. "10:00 AM").
 */
export const convertToTimeZone = (isoDateString: string, timeZone: string): string => {
  const date = new Date(isoDateString);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
    hour12: true,
  });
};

/**
 * Formatea una fecha para mostrarla en el resumen de la reserva.
 * @param isoDateString - La fecha en formato ISO.
 * @param timeZone - La zona horaria.
 * @returns La fecha y hora formateadas con la zona horaria (ej. "15 de julio de 2025, 10:00 AM (America/New_York)").
 */
export const formatBookingDateTime = (isoDateString: string, timeZone: string): string => {
    const date = new Date(isoDateString);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short',
        timeZone,
    };
    return date.toLocaleString([], options);
}
