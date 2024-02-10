import { Job } from "../job.model";

export class JobBuilder {
    protected id!: number;
    protected company!: string;
    protected logo!: string;
    protected new!: boolean;
    protected featured!: boolean;
    protected position!: string;
    protected role!: string;
    protected level!: string;
    protected postedAt!: string;
    protected contract!: string;
    protected location!: string;
    protected languages!: string[];
    protected tools!: string[];

    withId(id: number): JobBuilder {
        this.id = id;
        return this;
    }
    withCompany(company: string): JobBuilder {
        this.company = company;
        return this;
    }
    withlogo(logo: string): JobBuilder {
        this.logo = logo;
        return this;
    }
    withnew(isNew: boolean): JobBuilder {
        this.new = isNew;
        return this;
    }
    withfeatured(featured: boolean): JobBuilder {
        this.featured = featured;
        return this;
    }
    withposition(position: string): JobBuilder {
        this.position = position;
        return this;
    }
    withrole(role: string): JobBuilder {
        this.role = role;
        return this;
    }
    withlevel(level: string): JobBuilder {
        this.level = level;
        return this;
    }
    withpostedAt(postedAt: string): JobBuilder {
        this.postedAt = postedAt;
        return this;
    }
    withcontract(contract: string): JobBuilder {
        this.contract = contract;
        return this;
    }
    withlocation(location: string): JobBuilder {
        this.location = location;
        return this;
    }
    withlanguages(languages: string[]): JobBuilder {
        this.languages = languages;
        return this;
    }
    withtools(tools: string[]): JobBuilder {
        this.tools = tools;
        return this;
    }

    build(): Job {
        return {
            id:this.id,
            company:this.company,
            logo:this.logo,
            new:this.new,
            featured:this.featured,
            position:this.position,
            role:this.role,
            level:this.level,
            postedAt:this.postedAt,
            contract:this.contract,
            location:this.location,
            languages:this.languages,
            tools:this.tools,
        }
    }
}

export class stubJobBuilder extends JobBuilder {
    protected override id = 1; 
    protected override company = 'company'; 
    protected override logo = 'logo'; 
    protected override new = true; 
    protected override featured = true; 
    protected override position = 'position'; 
    protected override role = 'role'; 
    protected override level = 'level'; 
    protected override postedAt = 'postedAt'; 
    protected override contract = 'contract'; 
    protected override location = 'location'; 
    protected override languages = ['languages']; 
    protected override tools = ['tools']; 
}