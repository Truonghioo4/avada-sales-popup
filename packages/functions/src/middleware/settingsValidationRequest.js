const yup = require('yup');
export async function settingsValidationRequest(ctx, next) {
  try {
    const settingData = ctx.req.body;
    const settingSchema = yup.object().shape({
      shopId: yup.string().required(),
      position: yup
        .string()
        .oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right'])
        .default('bottom-left'),
      hideTimeAgo: yup.boolean().default(false),
      truncateProductName: yup.boolean().default(false),
      displayDuration: yup
        .number()
        .integer()
        .default(0),
      firstDelay: yup
        .number()
        .integer()
        .default(0),
      popsInterval: yup
        .number()
        .integer()
        .default(0),
      maxPopsDisplay: yup
        .number()
        .integer()
        .default(0),
      includedUrls: yup.string(),
      excludedUrls: yup.string(),
      allowShow: yup
        .string()
        .oneOf(['all', 'specific'])
        .default('all')
    });
    ctx.req.body = await settingSchema.validate(settingData);
    await next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e
    };
  }
}
