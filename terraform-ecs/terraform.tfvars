aws_region = "ap-south-1"

app_name = "todo-app"

container_port = 3000

cpu = "256"

memory = "512"

log_group_name = "/ecs/todo-app"

vpc_cidr = "10.0.0.0/16"

ecr_image_url = "115576798054.dkr.ecr.ap-south-1.amazonaws.com/todo-app:latest"
