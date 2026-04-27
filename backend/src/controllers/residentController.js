import Resident from '../models/Resident.js';
import {
  validateResidentPayload,
  validateFeedbackPayload,
} from '../utils/validateResident.js';

function toMongoSafeUpdate(payload) {
  const update = { ...payload };

  if (typeof update.email === 'string') {
    update.email = update.email.toLowerCase().trim();
  }

  return update;
}

async function listResidents(req, res) {
  try {
    const { q = '' } = req.query;

    let query = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      query = {
        $or: [
          { fullName: regex },
          { roomNumber: regex },
          { email: regex },
          { phone: regex },
        ],
      };
    }

    const residents = await Resident.find(query).sort({ createdAt: -1 });
    return res.json(residents);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch residents.', error: error.message });
  }
}

async function getResidentById(req, res) {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ message: 'Resident not found.' });
    }

    return res.json(resident);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch resident.', error: error.message });
  }
}

async function createResident(req, res) {
  try {
    const { isValid, errors } = validateResidentPayload(req.body);
    if (!isValid) {
      return res.status(400).json({ message: 'Validation failed.', errors });
    }

    const resident = await Resident.create(toMongoSafeUpdate(req.body));
    return res.status(201).json(resident);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'A resident with this email already exists.',
      });
    }

    return res.status(500).json({ message: 'Failed to create resident.', error: error.message });
  }
}

async function updateResident(req, res) {
  try {
    const { isValid, errors } = validateResidentPayload(req.body, true);
    if (!isValid) {
      return res.status(400).json({ message: 'Validation failed.', errors });
    }

    const resident = await Resident.findByIdAndUpdate(
      req.params.id,
      toMongoSafeUpdate(req.body),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!resident) {
      return res.status(404).json({ message: 'Resident not found.' });
    }

    return res.json(resident);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'A resident with this email already exists.',
      });
    }

    return res.status(500).json({ message: 'Failed to update resident.', error: error.message });
  }
}

async function deleteResident(req, res) {
  try {
    const resident = await Resident.findByIdAndDelete(req.params.id);

    if (!resident) {
      return res.status(404).json({ message: 'Resident not found.' });
    }

    return res.json({ message: 'Resident deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete resident.', error: error.message });
  }
}

async function addFeedback(req, res) {
  try {
    const { isValid, errors } = validateFeedbackPayload(req.body);
    if (!isValid) {
      return res.status(400).json({ message: 'Validation failed.', errors });
    }

    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ message: 'Resident not found.' });
    }

    resident.feedback.push({
      rating: Number(req.body.rating),
      comment: String(req.body.comment || '').trim(),
    });

    await resident.save();

    return res.status(201).json(resident);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to add feedback.', error: error.message });
  }
}

async function getResidentSummary(req, res) {
  try {
    const residents = await Resident.find({});
    const activeResidents = residents.filter((r) => r.isActive).length;
    const averageOccupantRating = residents.length
      ? Number(
          (
            residents.reduce((acc, resident) => acc + (resident.averageRating || 0), 0) /
            residents.length
          ).toFixed(2)
        )
      : 0;

    const topResidents = residents
      .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
      .slice(0, 3)
      .map((resident) => ({
        id: resident.id,
        fullName: resident.fullName,
        roomNumber: resident.roomNumber,
        averageRating: resident.averageRating || 0,
      }));

    return res.json({
      totalResidents: residents.length,
      activeResidents,
      averageOccupantRating,
      topResidents,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch summary.', error: error.message });
  }
}

export {
  addFeedback,
  createResident,
  deleteResident,
  getResidentById,
  getResidentSummary,
  listResidents,
  updateResident,
};
