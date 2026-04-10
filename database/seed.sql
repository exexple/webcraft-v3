-- Sample data for development
INSERT INTO leads (name, email, message, phone, status, source) VALUES
  ('Alice Johnson', 'alice@example.com', 'Looking for a new website for my startup', '+1234567890', 'new', 'website_form'),
  ('Bob Smith', 'bob@example.com', 'Need e-commerce integration for existing site', '+0987654321', 'contacted', 'website_form'),
  ('Carol White', 'carol@example.com', 'Interested in SEO and performance optimization', NULL, 'qualified', 'website_form'),
  ('David Lee', 'david@example.com', 'Need a portfolio website', '+1122334455', 'converted', 'website_form');
