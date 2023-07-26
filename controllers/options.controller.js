const OptionService = require("../services/options.service");

class OptionsController {
  optionService = new OptionService();

  createOption = async (req, res, next) => {
    const { extra_price, shot_price, hot } = req.body;
    try {
      const createOptionData = await this.optionService.createOption(
        extra_price,
        shot_price,
        hot
      );

      res.status(201).json({ data: createOptionData });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
}

module.exports = OptionsController;
