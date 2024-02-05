terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.3"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "vercel" {
  team = "team_zfgWnJXv2XUd0rTW2okTYvSZ"
}

provider "aws" {
  region = "us-west-2"
}