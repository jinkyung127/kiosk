const OptionRepository = require("../repositories/options.repository");

class OptionService {
  optionRepository = new OptionRepository();

  createOption = async (extra_price, shot_price, hot) => {
    const createOptionData = await this.optionRepository.createOption(
      extra_price,
      shot_price,
      hot
    );
    return createOptionData;
  };
}

module.exports = OptionService;
