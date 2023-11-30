import axios from "axios";
const endpoint = "http://localhost:3050";
const studentAPI = {
  getStudent: async (id) => {
    const response = await axios.get(endpoint + `/students/${id}`);
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
    return response.data;
  },
  getStudents: async () => {
    const response = await axios.get(endpoint + "/students");
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
    return response.data;
  },
  createStudent: async (student) => {
    const response = await axios.post(endpoint + "/students", student);
    return response.data;
  },
  updateStudent: async (student) => {
    const response = await axios.put(
      endpoint + `/students/${student.id}`,
      student
    );
    return response.data;
  },
  deleteStudent: async (id) => {
    const response = await axios.delete(endpoint + `/students/${id}`);
    return response.data;
  },
};

const programAPI = {
  getProgram: async (id) => {
    const response = await axios.get(endpoint + `/programs/${id}`);
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  getPrograms: async () => {
    const response = await axios.get(endpoint + "/programs");
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  createProgram: async (program) => {
    const response = await axios.post(endpoint + "/programs", program);
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  updateProgram: async (program) => {
    const response = await axios.put(
      endpoint + `/programs/${program.id}`,
      program
    );
    return response.data;
  },
  deleteProgram: async (id) => {
    const response = await axios.delete(endpoint + `/programs/${id}`);
    return response.data;
  },
};
const courseAPI = {
  getCourse: async (id) => {
    const response = await axios.get(endpoint + `/courses/${id}`);
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  getCourses: async () => {
    const response = await axios.get(endpoint + "/courses");
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  createCourse: async (course) => {
    const response = await axios.post(endpoint + "/courses", course);
    return response.data;
  },
  updateCourse: async (course) => {
    const response = await axios.put(
      endpoint + `/courses/${course.id}`,
      course
    );
    return response.data;
  },
  deleteCourse: async (id) => {
    const response = await axios.delete(endpoint + `/courses/${id}`);
    return response.data;
  },
};
const enrollmentAPI = {
  getEnrollment: async (id) => {
    const response = await axios.get(endpoint + `/enrollments/${id}`);
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  getEnrollments: async () => {
    const response = await axios.get(endpoint + "/enrollments");
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  createEnrollment: async (enrollment) => {
    const response = await axios.post(endpoint + "/enrollments", enrollment);
    return response.data;
  },
  updateEnrollment: async (enrollment) => {
    const response = await axios.put(
      endpoint + `/enrollments/${enrollment.id}`,
      enrollment
    );
    return response.data;
  },
  deleteEnrollment: async (id) => {
    const response = await axios.delete(endpoint + `/enrollments/${id}`);
    return response.data;
  },
};
const paymentAPI = {
  getPayment: async (id) => {
    const response = await axios.get(endpoint + `/payments/${id}`);
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  getPayments: async () => {
    const response = await axios.get(endpoint + "/payments");
    if (response.data.data) {
      return response.data.data;
    }
    throw new Error("No data");
  },
  createPayment: async (payment) => {
    const response = await axios.post(endpoint + "/payments", payment);
    return response.data;
  },
  updatePayment: async (payment) => {
    const response = await axios.put(
      endpoint + `/payments/${payment.id}`,
      payment
    );
    return response.data;
  },
  deletePayment: async (id) => {
    const response = await axios.delete(endpoint + `/payments/${id}`);
    return response.data;
  },
};

window.studentAPI = studentAPI;
window.programAPI = programAPI;
window.courseAPI = courseAPI;
window.enrollmentAPI = enrollmentAPI;
window.paymentAPI = paymentAPI;
export { studentAPI, programAPI, courseAPI, enrollmentAPI, paymentAPI };
