import Event from '../models/Event.js';
import AppError from '../utils/errorHandler.js';

const createEvent = async (payload) => {
  const event = await Event.create(payload);

  return event;
};

const getEvent = async (profileId) => {
  const event = await Event.find({ profiles: profileId })
    .populate('profiles', 'name')

    .populate({
      path: 'updateLogs.newData.profiles',
      model: 'Profile',
      select: 'name',
    })

    .populate({
      path: 'updateLogs.previousData.profiles',
      model: 'Profile',
      select: 'name',
    });

  return event;
};

export const updateEvent = async (eventId, updateData) => {
  const existingEvent = await Event.findById(eventId);
  if (!existingEvent) throw new AppError('Event not found', 400);

  const previousData = {};
  const newData = {};
  let changed = false;

  if (updateData.timezone && existingEvent.timezone !== updateData.timezone) {
    previousData.timezone = existingEvent.timezone;
    newData.timezone = updateData.timezone;
    existingEvent.timezone = updateData.timezone;
    changed = true;
  }

  if (
    updateData.startTime &&
    existingEvent.startTime.toISOString() !==
      new Date(updateData.startTime).toISOString()
  ) {
    previousData.startTime = existingEvent.startTime;
    newData.startTime = updateData.startTime;
    existingEvent.startTime = updateData.startTime;
    changed = true;
  }

  if (
    updateData.endTime &&
    existingEvent.endTime.toISOString() !==
      new Date(updateData.endTime).toISOString()
  ) {
    previousData.endTime = existingEvent.endTime;
    newData.endTime = updateData.endTime;
    existingEvent.endTime = updateData.endTime;
    changed = true;
  }

  const oldSet = new Set(existingEvent.profiles.map(String));
  const newSet = new Set(updateData.profiles.map(String));

  const profilesChanged =
    oldSet.size !== newSet.size || [...oldSet].some((id) => !newSet.has(id));

  if (profilesChanged) {
    previousData.profiles = existingEvent.profiles;
    newData.profiles = updateData.profiles;
    existingEvent.profiles = updateData.profiles;
    changed = true;
  }

  if (changed) {
    existingEvent.updateLogs.push({
      previousData,
      newData,
    });
    await existingEvent.save();
  }

  return existingEvent;
};

export default { createEvent, getEvent, updateEvent };
