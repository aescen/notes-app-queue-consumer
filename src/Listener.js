class Listener {
  constructor(notesService, mailSender) {
    this._notesService = notesService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());
      const notes = await this._notesService.getNotes(userId);
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(notes, null, 2));
      console.log(`MailSender: ${JSON.stringify(result, null, 2)}`);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = Listener;
