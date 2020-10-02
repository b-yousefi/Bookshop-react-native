import moment from "moment";

class Author {
  constructor(id, fullName, birthday, description, picture) {
    this.id = id;
    this.fullName = fullName;
    this.birthday = birthday;
    this.description = description;
    this.picture = picture;
  }

  get readableBirthdayDate() {
    return moment(this.birthday).format("MMMM Do YYYY");
  }
}

export default Author;
