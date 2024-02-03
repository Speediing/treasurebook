data "aws_secretsmanager_secret_version" "example2" {
  secret_id = aws_secretsmanager_secret.example2.id
}

resource "vercel_project_environment_variable" "example2" {
  project_id = vercel_project.example2.id
  key        = "foo2"
  value      =  data.aws_secretsmanager_secret_version.example2.secret_string
  target     = ["production"]
}
