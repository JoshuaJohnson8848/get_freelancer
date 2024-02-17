const Proposal = require('../models/proposals');
const changeObjectId = require('../utils/helper');

exports.createProposal = async (req, res, next) => {
  try {
    const { proposal, bid, time, projectId } = req.body;
    const { userId } = req;

    const data = await new Proposal({
      projectId: projectId,
      userId: userId,
      proposal: proposal,
      bid: bid,
      time: time,
    });
    console.log(data);
    const createdProps = await data.save();
    if (!createdProps) {
      const error = new Error('Proposal Creation Failed');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Propsal Created', data: createdProps });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.updateProposal = async (req, res, next) => {
  try {
    const { proposal, bid, time } = req.body;
    const { proposalId } = req.params;

    const existData = await Proposal.findById(proposalId);
    if (!existData) {
      const error = new Error('Proposal Not Found');
      error.status = 404;
      throw error;
    }
    existData.proposal = proposal;
    existData.bid = bid;
    existData.time = time;
    const updatedProps = await existData.save();
    if (!updatedProps) {
      const error = new Error('Proposal Updation Failed');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Proposal Updated', updtaed: true });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.getProposalByProjectId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const props = await Proposal.aggregate([
      {
        $match: {
          projectId: changeObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userData',
        },
      },
      {
        $unwind: {
          path: '$userData',
        },
      },
      {
        $lookup: {
          from: 'freelancers',
          localField: 'userId',
          foreignField: 'userId',
          as: 'freelancerData',
        },
      },
      {
        $unwind: {
          path: '$freelancerData',
        },
      },
      {
        $project: {
          name: '$userData.name',
          experience: '$freelancerData.experience',
          skills: '$freelancerData.skills',
          rating: '$freelancerData.rating',
          proposal: 1,
          bid: 1,
          time: 1,
        },
      },
    ]);
    if (!props.length) {
      const error = new Error('Data Not Found');
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: 'Proposals Fetched', data: props[0] });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Proposal.findByIdAndDelete(id);
    if (!data) {
      const error = new Error('Proposal Not Deleted');
      error.status = 422;
      throw error;
    }
    res.status(200).json({ message: 'Deleted Successfully', deleted: true });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};
