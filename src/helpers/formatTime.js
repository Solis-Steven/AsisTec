/* This function takes a time in 12-hour format and
converts it to 24-hour format. */
export const formatTime = (item) => {
    // Event hour
    const {initialHour} = item;
    const [hours, minutes] = initialHour.split(":")
    let adjustedHours = parseInt(hours);
    const AMPM = initialHour.slice(-2);

    if(AMPM === "PM" && adjustedHours !== 12) {
      adjustedHours += 12;
    } else if(AMPM === "AM" && adjustedHours === 12) {
      adjustedHours = 0;
    }

    return(`${adjustedHours.toString()}:${minutes.slice(0, 2)}`)
}