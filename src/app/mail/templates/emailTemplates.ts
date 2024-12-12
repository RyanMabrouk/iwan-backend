import { Tables } from 'src/types/database.types';

const orderPlacementTemplates = (
  isAdmin = false,
  order: Omit<Tables<'orders'>, 'created_at' | 'updated_at'>,
  books: (Omit<Tables<'books'>, 'created_at' | 'updated_at'> & {
    quantity: number;
  })[],
  subtotal: number,
  deliveryCost: number,
) => {
  const total = subtotal + deliveryCost;
  const withImages = true;
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isAdmin ? 'طلب جديد تم استلامه' : 'تأكيد الطلب'}</title>
    </head>
    <body dir="rtl" style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f6f9fc; margin: 0; padding: 0; text-align: right;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 40px 20px; text-align: center; background-color: #009688; background-image: linear-gradient(135deg, #009688 0%, #00796b 100%);">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">${
              isAdmin ? 'طلب جديد تم استلامه' : 'تأكيد الطلب'
            }</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 20px;">
            <p style="font-size: 18px; color: #333333; margin-bottom: 20px; text-align: center;">
              ${
                isAdmin
                  ? `تم استلام طلب جديد من ${order.name} .`
                  : `شكراً لطلبك، ${order.name}!`
              }
            </p>
            ${
              isAdmin
                ? `
                <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                  <tr>
                    <td colspan="2" style="padding: 15px; background-color: #f8f8f8; font-weight: bold; font-size: 20px; color: #333333; text-align: center;">
                      معلومات العميل
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">الهاتف:</td>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${order.phone_number}</td>
                  </tr>
                  <tr>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">البريد الإلكتروني:</td>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${order.address}</td>
                  </tr>
                </table>
                `
                : ''
            }
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <tr>
                <td colspan="4" style="padding: 15px; background-color: #f8f8f8; font-weight: bold; font-size: 20px; color: #333333; text-align: center;">
                  تفاصيل الطلب
                </td>
              </tr>
              ${books
                ?.map(
                  (item) => `
                <tr>
                  ${
                    withImages
                      ? `
                  <td style="padding: 15px; border-top: 1px solid #e0e0e0; width: 80px;">
                    <img src="${item?.images_urls[0] ?? ''}" alt="${item?.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 6px; display: block;">
                  </td>
                  `
                      : ''
                  }
                  <td style="padding: 15px; border-top: 1px solid #e0e0e0;">
                    <span style="font-weight: bold; color: #009688; font-size: 16px;">${
                      item?.title
                    }</span>
                  </td>
                  <td style="padding: 15px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 16px;">
                    ${item.quantity}x
                  </td>
                  <td style="padding: 15px; border-top: 1px solid #e0e0e0; text-align: left; font-size: 16px;">
                    ${(item.price * item.quantity).toFixed(2)} د.م
                  </td>
                </tr>
              `,
                )
                .join('')}
              <tr>
                <td colspan="3" style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold; text-align: left; font-size: 16px;">
                  المجموع الفرعي:
                </td>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0; text-align: left; font-size: 16px;">
                  ${subtotal.toFixed(2)} د.م
                </td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold; text-align: left; font-size: 16px;">
                  تكلفة التوصيل:
                </td>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0; text-align: left; font-size: 16px;">
                  ${deliveryCost.toFixed(2)} د.م
                </td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold; text-align: left; font-size: 18px;">
                  الإجمالي:
                </td>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold; text-align: left; font-size: 18px; color: #009688;">
                  ${total.toFixed(2)} د.م
                </td>
              </tr>
            </table>
            ${
              deliveryCost > 0
                ? `<p style="font-size: 16px; color: #666666; margin-top: 20px; text-align: center;">
                    تمت إضافة رسوم توصيل قدرها 8 د.م، حيث أن إجمالي الطلب أقل من 100 د.م.
                   </p>`
                : ''
            }
            <p style="font-size: 18px; color: #333333; margin-top: 30px; text-align: center; font-style: italic;">
              نقدر ثقتك بنا!
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f8f8f8; color: #666666; font-size: 14px;">
            &copy; ${new Date().getFullYear()} مكتبة ايوان  جميع الحقوق محفوظة.
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const orderCancellationTemplate = (
  isAdmin = false,
  order: Omit<Tables<'orders'>, 'created_at' | 'updated_at'>,
  orderNumber: string,
  cancellationReason: string,
) => {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isAdmin ? 'إشعار إلغاء الطلب' : 'تأكيد إلغاء الطلب'}</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f6f9fc; margin: 0; padding: 0; text-align: right;">
      <table dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 40px 20px; text-align: center; background-color: #d32f2f; background-image: linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%);">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
              ${isAdmin ? 'إشعار إلغاء الطلب' : 'تأكيد إلغاء الطلب'}
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 20px;">
            ${
              isAdmin
                ? `
                <p style="font-size: 18px; color: #333333; margin-bottom: 20px; text-align: right;">
                  تم إلغاء طلب جديد من قبل العميل.
                </p>
                `
                : `
                <p style="font-size: 18px; color: #333333; margin-bottom: 20px; text-align: center;">
                  عزيزي ${order.name} ،
                </p>
                <p style="font-size: 16px; color: #333333; margin-bottom: 20px; text-align: right;">
                  نؤكد لكم أنه تم إلغاء طلبكم رقم <strong>${orderNumber}</strong> بنجاح.
                </p>
                `
            }
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <tr>
                <td colspan="2" style="padding: 15px; background-color: #f8f8f8; font-weight: bold; font-size: 20px; color: #333333; text-align: center;">
                  تفاصيل الإلغاء
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">رقم الطلب:</td>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${orderNumber}</td>
              </tr>
              ${
                isAdmin
                  ? `
                  <tr>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">اسم العميل:</td>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${order.name} </td>
                  </tr>
                  <tr>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">البريد الإلكتروني:</td>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${order.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">رقم الهاتف:</td>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${order.phone_number}</td>
                  </tr>
                  `
                  : ''
              }
              <tr>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">سبب الإلغاء:</td>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${cancellationReason}</td>
              </tr>
            </table>
            ${
              isAdmin
                ? `
                <p style="font-size: 16px; color: #333333; margin-bottom: 20px; text-align: right;">
                  يرجى مراجعة تفاصيل الإلغاء واتخاذ الإجراءات اللازمة.
                </p>
                `
                : `
                <p style="font-size: 16px; color: #333333; margin-bottom: 20px; text-align: right;">
                  إذا كان لديكم أي استفسارات أو كنتم بحاجة إلى مزيد من المعلومات، فلا تترددوا في الاتصال بنا.
                </p>
                <p style="font-size: 16px; color: #333333; margin-bottom: 20px; text-align: right;">
                  نأسف لعدم تمكنكم من إتمام هذا الطلب ونتطلع إلى خدمتكم في المستقبل.
                </p>
                `
            }
            <p style="font-size: 18px; color: #333333; margin-top: 30px; text-align: center; font-style: italic;">
              ${
                isAdmin
                  ? 'شكراً لاهتمامكم السريع بهذا الأمر.'
                  : 'شكراً لتفهمكم ودعمكم المستمر.'
              }
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f8f8f8; color: #666666; font-size: 14px;">
            &copy; ${new Date().getFullYear()} مكتبة ايوان. جميع الحقوق محفوظة.
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

const orderDeliveryTemplate = (
  isAdmin = false,
  order: Omit<Tables<'orders'>, 'created_at' | 'updated_at'>,
  orderNumber: string,
  deliveryDate: string,
  deliveryAddress: string,
) => {
  return `
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${isAdmin ? 'إشعار وصول الطلب' : 'تأكيد وصول الطلب'}</title>
    </head>
    <body dir="rtl" style="font-family: 'Arial', sans-serif; line-height: 1.6; background-color: #f6f9fc; margin: 0; padding: 0; text-align: right;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 40px 20px; text-align: center; background-color: #4CAF50; background-image: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">
              ${isAdmin ? 'إشعار وصول الطلب' : 'تأكيد وصول الطلب'}
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 20px;">
            ${
              isAdmin
                ? `
                <p style="font-size: 18px; color: #333333; margin-bottom: 20px; text-align: right;">
                  تم تسليم الطلب للعميل بنجاح.
                </p>
                `
                : `
                <p style="font-size: 18px; color: #333333; margin-bottom: 20px; text-align: center;">
                  عزيزي ${order.name}،
                </p>
                <p style="font-size: 16px; color: #333333; margin-bottom: 20px; text-align: right;">
                  نود إعلامكم أن طلبكم رقم <strong>${orderNumber}</strong> قد تم تسليمه بنجاح.
                </p>
                `
            }
            <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
              <tr>
                <td colspan="2" style="padding: 15px; background-color: #f8f8f8; font-weight: bold; font-size: 20px; color: #333333; text-align: center;">
                  تفاصيل التسليم
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">رقم الطلب:</td>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${orderNumber}</td>
              </tr>
              <tr>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">تاريخ التسليم:</td>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${deliveryDate}</td>
              </tr>
              <tr>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">عنوان التسليم:</td>
                <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${deliveryAddress}</td>
              </tr>
              ${
                isAdmin
                  ? `
                  <tr>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">اسم العميل:</td>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${order.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">البريد الإلكتروني:</td>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${order.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0; font-weight: bold;">رقم الهاتف:</td>
                    <td style="padding: 15px; border-top: 1px solid #e0e0e0;">${order.phone_number}</td>
                  </tr>
                  `
                  : ''
              }
            </table>
            ${
              isAdmin
                ? `
                <p style="font-size: 16px; color: #333333; margin-bottom: 20px; text-align: right;">
                  يرجى تحديث حالة الطلب في نظام إدارة المخزون.
                </p>
                `
                : `
                <p style="font-size: 16px; color: #333333; margin-bottom: 20px; text-align: right;">
                  نأمل أن تكونوا راضين عن منتجاتنا وخدمة التوصيل. إذا كان لديكم أي استفسارات أو ملاحظات، فلا تترددوا في الاتصال بنا.
                </p>
                <p style="font-size: 16px; color: #333333; margin-bottom: 20px; text-align: right;">
                  نشكركم على اختياركم لنا ونتطلع إلى خدمتكم مرة أخرى في المستقبل.
                </p>
                `
            }
            <p style="font-size: 18px; color: #333333; margin-top: 30px; text-align: center; font-style: italic;">
              ${
                isAdmin
                  ? 'شكراً لجهودكم في إتمام عملية التسليم بنجاح.'
                  : 'شكراً لثقتكم بنا!'
              }
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f8f8f8; color: #666666; font-size: 14px;">
            &copy; ${new Date().getFullYear()} مكتبة ايوان. جميع الحقوق محفوظة.
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
export {
  orderPlacementTemplates,
  orderCancellationTemplate,
  orderDeliveryTemplate,
};
