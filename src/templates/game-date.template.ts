export const gameDateTimeTemplate = (data: {
  dateTime: Date;
  team_1: string;
  team_2: string;
}): string => {
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>The game Date</title>
      </head>
      <body>
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 20px 0; text-align: center; background-color: #148053;">
                    <h1 style="color: #fff;">The game Date</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px;">
                    <p>The game starts at <b>${new Date(
                      data.dateTime,
                    ).toDateString()}</b></p>
                    <p><b>team: ${data.team_1}</b></p>
                    <p><b>VS</b></p>
                    <p><b>team: ${data.team_2}</b></p>
                    <p>If you didn't create an account on our website, you can safely ignore this email.</p>
                  </td>
                </tr>
                <tr>
                  <td style="background-color: #f0f0f0; text-align: center; padding: 20px;">
                    <p>&copy; 2024 FUL.AM All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return content;
};
