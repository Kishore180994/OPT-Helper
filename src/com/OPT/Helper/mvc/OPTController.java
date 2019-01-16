package com.OPT.Helper.mvc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OPTController {

	@Autowired
	PDFHelper _pdf;
	
	@RequestMapping("/")
	public String showPage()
	{
		_pdf.readFile();
		_pdf.saveFile();
		_pdf.close();
		return "WelcomePage";
	}
}

