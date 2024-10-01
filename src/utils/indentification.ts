export function splitIdentification(identificationString: string) {
    const regex = /^([A-Z])-([0-9]+)$/;
    const match = identificationString.match(regex);
  
    if (!match) {
      throw new Error('El formato de identificación no es válido');
    }
  
    return {
      identification_type: match[1],
      identification: match[2],
    };
  }
  