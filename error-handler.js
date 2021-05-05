function error404(req, res) {
    res.status(404).json({
      success: false, 
      message: "page not found"
    })
  }
  
  module.exports = { error404 };