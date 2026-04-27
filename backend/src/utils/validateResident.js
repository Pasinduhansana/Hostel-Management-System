const VALID_GENDERS = ['Male', 'Female', 'Other'];

function isBlank(value) {
  return typeof value !== 'string' || value.trim().length === 0;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function isPhone(value) {
  return /^\+?[0-9\-\s]{7,20}$/.test(String(value || '').trim());
}

function validateResidentPayload(payload, isPartial = false) {
  const errors = {};

  if (!isPartial || payload.fullName !== undefined) {
    if (isBlank(payload.fullName)) {
      errors.fullName = 'Full name is required.';
    }
  }

  if (!isPartial || payload.roomNumber !== undefined) {
    if (isBlank(payload.roomNumber)) {
      errors.roomNumber = 'Room number is required.';
    }
  }

  if (!isPartial || payload.phone !== undefined) {
    if (isBlank(payload.phone)) {
      errors.phone = 'Phone number is required.';
    } else if (!isPhone(payload.phone)) {
      errors.phone = 'Phone number format is invalid.';
    }
  }

  if (!isPartial || payload.email !== undefined) {
    if (isBlank(payload.email)) {
      errors.email = 'Email is required.';
    } else if (!isEmail(payload.email)) {
      errors.email = 'Email format is invalid.';
    }
  }

  if (payload.gender !== undefined && !VALID_GENDERS.includes(payload.gender)) {
    errors.gender = 'Gender must be Male, Female, or Other.';
  }

  if (payload.dateOfBirth) {
    const date = new Date(payload.dateOfBirth);
    if (Number.isNaN(date.getTime())) {
      errors.dateOfBirth = 'Date of birth must be a valid date.';
    }
  }

  if (payload.emergencyContact?.phone && !isPhone(payload.emergencyContact.phone)) {
    errors.emergencyPhone = 'Emergency contact phone is invalid.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function validateFeedbackPayload(payload) {
  const errors = {};
  const rating = Number(payload.rating);

  if (Number.isNaN(rating) || rating < 1 || rating > 5) {
    errors.rating = 'Rating must be between 1 and 5.';
  }

  if (payload.comment && String(payload.comment).length > 500) {
    errors.comment = 'Feedback comment can not exceed 500 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export {
  validateResidentPayload,
  validateFeedbackPayload,
};
