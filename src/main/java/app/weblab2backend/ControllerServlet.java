package app.weblab2backend;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "controllerServlet", value = "/controller-servlet")
public class ControllerServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("received GET request");
		if(request.getParameter("x") != null && request.getParameter("y") != null && request.getParameter("r") != null) {
			response.setStatus(HttpServletResponse.SC_OK);
			System.out.println("OK, forwarding to /area-check-servlet");
			request.getRequestDispatcher("/area-check-servlet").forward(request, response);
		} else response.sendError(HttpServletResponse.SC_NOT_ACCEPTABLE);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.err.println("POST request is not allowed");
		response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
	}
}
