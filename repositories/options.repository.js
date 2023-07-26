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
}

module.exports = OptionRepository;
