const { Options } = require("../models");

class OptionRepository {
  createOption = async (extra_price, shot_price, hot) => {
    const createOptionData = await Options.create({
      extra_price,
      shot_price,
      hot,
    });

    return createOptionData;
  };

  deleteOption = async (id) => {
    const deleteOptionData = await Options.destroy({
      where: { id },
    });

    return deleteOptionData;
  };
}

module.exports = OptionRepository;
