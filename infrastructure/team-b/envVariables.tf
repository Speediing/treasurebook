data "aws_secretsmanager_secret_version" "example" {
  secret_id = aws_secretsmanager_secret.team_secret_2.id
}

resource "vercel_project_environment_variable" "example" {
  project_id = vercel_project.example.id
  key        = "foo2"
  value      =  data.aws_secretsmanager_secret_version.example.secret_string
  target     = ["production"]
}
