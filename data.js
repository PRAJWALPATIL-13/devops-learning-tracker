// DevOps Learning Plan - Structure by Week

const weeks = [
    {
        title: "Week 1: Linux Operating System",
        description: "Mastering the file system, permissions, and administration.",
        topics: [
            { title: "Linux Basics", details: "File system hierarchy, navigating the terminal." },
            { title: "File Permissions", details: "chmod, chown, user groups & management." },
            { title: "Process Management", details: "ps, top, kill, managing background jobs." },
            { title: "Networking Commands", details: "curl, wget, netstat, ip, ssh." },
            { title: "Package Management", details: "apt, yum, rpm, system updates." },
            { title: "Text Manipulation", details: "grep, sed, awk, pipe operations." },
            { title: "Shell Customization", details: ".bashrc, aliases, environment variables." }
        ]
    },
    {
        title: "Week 2: Python & Git",
        description: "Scripting basics and Version Control fundamentals.",
        topics: [
            { title: "Python Setup & Basics", details: "Installation, types, variables, operators." },
            { title: "Python Control Flow", details: "Loops (for/while) and Conditionals (if/else)." },
            { title: "Python Functions", details: "Defining functions, modules, pip." },
            { title: "Python for DevOps", details: "OS module, file handling, automation scripts." },
            { title: "Git Basics", details: "init, clone, add, commit, push, pull." },
            { title: "Git Branching", details: "Branching strategies, merging, conflict resolution." },
            { title: "Advanced Git", details: "Rebase, stash, cherry-pick, .gitignore." }
        ]
    },
    {
        title: "Week 3: Jenkins (CI/CD)",
        description: "Continuous Integration and Deployment pipelines.",
        topics: [
            { title: "CI/CD Concepts", details: "Understanding the software delivery lifecycle." },
            { title: "Jenkins Setup", details: "Installation, dashboard overview, plugins." },
            { title: "Jenkins Jobs", details: "Freestyle projects, build triggers." },
            { title: "Jenkins Pipelines", details: "Declarative vs Scripted pipelines, Jenkinsfile." },
            { title: "Build Tools Integration", details: "Maven, NPM, Gradle integration." },
            { title: "Notifications", details: "Email, Slack integration for build status." },
            { title: "Jenkins Security", details: "User management, role-based access." }
        ]
    },
    {
        title: "Week 4: AWS Cloud",
        description: "Cloud infrastructure services and management.",
        topics: [
            { title: "IAM & Security", details: "Users, Roles, Policies, best practices." },
            { title: "EC2 (Compute)", details: "Instances, AMI, Security Groups, Key Pairs." },
            { title: "VPC (Networking)", details: "Subnets, Route Tables, Internet Gateway, NAT." },
            { title: "S3 (Storage)", details: "Buckets, object storage, versioning, lifecycle." },
            { title: "RDS & DynamoDB", details: "Managed relational and NoSQL databases." },
            { title: "Load Balancing", details: "Classic vs Application Load Balancer, Auto Scaling." },
            { title: "CloudWatch", details: "Monitoring, alarms, and logging." }
        ]
    },
    {
        title: "Week 5: Terraform (IaC)",
        description: "Infrastructure as Code with Terraform.",
        topics: [
            { title: "IaC Principles", details: "Declarative infrastructure, benefits." },
            { title: "Terraform Basics", details: "HCL syntax, providers, resources." },
            { title: "Variables & Outputs", details: "Input variables, output values, data sources." },
            { title: "State Management", details: "Local vs Remote state, state locking." },
            { title: "Modules", details: "Writing reusable modules, registry modules." },
            { title: "Provisioners", details: "local-exec, remote-exec (use sparingly)." },
            { title: "Terraform Cloud", details: "Workspaces, remote runs, collaboration." }
        ]
    },
    {
        title: "Week 6: Docker",
        description: "Containerization basics and best practices.",
        topics: [
            { title: "Docker Architecture", details: "Images, Containers, Registry, Daemon." },
            { title: "Docker CLI", details: "Running, stopping, managing containers." },
            { title: "Dockerfiles", details: "Writing optimized Dockerfiles, multi-stage builds." },
            { title: "Docker Networking", details: "Bridge, host, overlay networks." },
            { title: "Docker Volumes", details: "Persistent storage, bind mounts." },
            { title: "Docker Compose", details: "Orchestrating multi-container apps." },
            { title: "Container Security", details: "Image scanning, least privilege users." }
        ]
    },
    {
        title: "Week 7: Kubernetes",
        description: "Container orchestration at scale.",
        topics: [
            { title: "K8s Architecture", details: "Control Plane, Worker Nodes, Components." },
            { title: "Pods & Namespaces", details: "Basic units, logical isolation." },
            { title: "Deployments", details: "ReplicaSets, Rolling updates, scaling." },
            { title: "Services", details: "ClusterIP, NodePort, LoadBalancer." },
            { title: "Storage", details: "PV, PVC, StorageClasses." },
            { title: "Config & Secrets", details: "ConfigMaps, Secrets management." },
            { title: "Helm", details: "Package management for Kubernetes." }
        ]
    },
    {
        title: "Week 8: Ansible",
        description: "Configuration Management.",
        topics: [
            { title: "Ansible Basics", details: "Agentless architecture, inventory files." },
            { title: "Ad-Hoc Commands", details: "Running one-off tasks across commands." },
            { title: "Playbooks", details: "YAML structure, tasks, modules." },
            { title: "Variables & Loops", details: "Dynamic configuration control." },
            { title: "Roles", details: "Structuring complex playbooks." },
            { title: "Ansible Galaxy", details: "Using community roles." },
            { title: "Ansible Vault", details: "Encrypting sensitive data." }
        ]
    },
    {
        title: "Week 9: GitHub Actions",
        description: "Modern CI/CD within GitHub.",
        topics: [
            { title: "Workflow Syntax", details: ".github/workflows YAML structure." },
            { title: "Events & Triggers", details: "push, pull_request, schedule." },
            { title: "Jobs & Runners", details: "Defining jobs, using ubuntu-latest." },
            { title: "Actions", details: "Using checkout, setup-node, and marketplace actions." },
            { title: "Secrets", details: "Managing repository secrets securely." },
            { title: "Artifacts", details: "Uploading/Downloading build artifacts." },
            { title: "Deployment", details: "Deploying to AWS/Azure from GitHub." }
        ]
    }
];
