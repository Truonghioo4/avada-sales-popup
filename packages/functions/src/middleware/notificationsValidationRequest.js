import yup from 'yup';
export default async function notificationsValidationRequest(ctx, next) {
  try {
    const notificationData = ctx.req.body;
    const notificationSchema = yup.object().shape({
      shopId: yup.string().required(),
      firstName: yup.string(),
      city: yup.string(),
      productName: yup.string(),
      country: yup.string(),
      productId: yup.number().integer(),
      timestamp: yup.date().default(() => new Date()),
      productImage: yup.string().url(),
      productUrl: yup.string().url(),
      shopifyDomain: yup.string()
    });
    ctx.req.body = await notificationSchema.validate(notificationData);
    await next();
  } catch (e) {
    ctx.status = 400;
    ctx.boyd = {
      success: false,
      error: e
    };
  }
}
