const Card = require('../models/card');
const Project = require('../models/project');
const asyncHandler = require('../middleware/async');
const errorHandler = require('../middleware/error');

//create card
// @route       POST /api/card/create
// @access      Private
exports.createCardController = asyncHandler(async (req, res, next) =>{
    const card = await Card.create({
    ...req.body,
    createdBy: req.user._id,
  });

  let project = await Project.findById(req.body.listId);

  let cards = [...project.cards.map((c) => c._id)];
  if (!cards.includes(card._id)) {
    cards.push(card._id);
  }

  project.cards = cards;
  project.save();

  res.status(200).json({
    success: true,
    data: card,
  });
});
//get card
// @route       GET /api/card/:id
// @access      Private
exports.getCardController = asyncHandler(async (req, res, next) => {
    const card = await Card.findById(req.params.id)
    .populate({
      path: "projectId",
      select: "title",
    })
    .populate({
      path: "members",
      select: "name photo",
    })
    .populate({
      path: "comments",
      select: "text createdBy createdAt",
      populate: {
        path: "createdBy",
        select: "name photo",
      },
    });

  res.status(200).json({
    success: true,
    data: card,
  });
});

//reorder card
// @route       PUT /api/card/reorder
// @access      Private
exports.reorderCardController = asyncHandler(async (req, res, next) => {
    const { cards, projects } = req.body;
    var iterator = 0;
  function updateCards() {
    if (cards.length > 0) {
      if (iterator < cards.length) {
        let card = cards[iterator];

        Card.findOneAndUpdate({ _id: card._id }, card, {
          new: true,
          runValidators: true,
        })
          .then((res) => {
            console.log(res);
            iterator += 1;
            updateCards();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        updateProject();
      }
    }
  }

  var iterator2 = 0;
  function updateProject() {
    if (projects.length > 0) {
      if (iterator2 < projects.length) {
        let project = projects[iterator2];

        Project.findOneAndUpdate({ _id: project._id }, project, {
          new: true,
          runValidators: true,
        })
          .then((res) => {
            console.log(res);
            iterator2 += 1;
            updateProject();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.status(200).json({
          success: true,
          data: null,
        });
      }
    }
  }

  //  res.status(200).json({
  //    success: true,
  //    data: null,
  //  });

  updateCards();
})
//update card
// @route       PUT /api/card/:id
// @access      Private
exports.updateCardController = asyncHandler(async (req, res, next) => {
    const card = await Card.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .populate({
      path: "projectId",
      select: "title",
    })
    .populate({
      path: "members",
      select: "name photo",
    })
    .populate({
      path: "comments",
      select: "text createdBy createdAt",
      populate: {
        path: "createdBy",
        select: "name photo",
      },
    });

  res.status(200).json({
    success: true,
    data: card,
  });
});
//delete card
// @route       DELETE /api/card/:id
// @access      Private
exports.deleteCardController = asyncHandler(async (req, res, next) =>{
    const card = await Card.findByIdAndDelete(req.params.id);

  const project = await Project.findById(card.listId);
  let cards = project.cards.filter((c) => c.toString() !== req.params.id);
  project.cards = cards;
  project.save();

  res.status(200).json({
    success: true,
    data: null,
  });
});